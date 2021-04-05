import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';
import { collatedTasksExist } from '../helpers';
import moment from 'moment';

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    // 先抓出使用者，然後使用 Compound queries 來細抓資料
    // https://firebase.google.com/docs/firestore/query-data/queries
    let unsubscribe = firestore.collection('tasks').where('userId', '==', 'abc123');

    // 如果選取的是不在預設項目裡就抓特定 id
    if (selectedProject && !collatedTasksExist(selectedProject)) {
      unsubscribe = unsubscribe.where('projectId', '==', selectedProject);
    }
    // 如果是選取的是 Today 就抓今天的任務
    if (selectedProject === 'TODAY') {
      unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY'));
    }
    // 如果是選取的是 Inbox 就抓沒填日期的
    if (selectedProject === 'INBOX' || selectedProject === 0) {
      unsubscribe = unsubscribe.where('date', '==', '');
    }

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      let tasks;
      if (selectedProject === 'NEXT_7') {
        tasks = newTasks.filter(
          (task) =>
            moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true,
        );
      } else {
        tasks = newTasks.filter((task) => task.archived !== true);
      }

      setTasks(tasks);
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    firestore
      .collection('projects')
      .where('userId', '==', 'abc123')
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) setProjects(allProjects);
      });
  }, [projects]);
  return projects;
};
