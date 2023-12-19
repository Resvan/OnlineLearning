import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EnrolledList = () => {
  const { id } = useParams();
  
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const token = useSelector((state)=>state.token);

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:6001/course/enrolled/${id}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        }
    );
        setEnrolledUsers(response.data);
      } catch (error) {
        console.error('Error fetching enrolled users:', error);
      }
    };

    fetchEnrolledUsers();
  }, [id]);

  return (
    <div>
      <h2>Enrolled Users</h2>
      <ul>
        {enrolledUsers.map((user, i) => (
          <li key={i}>
            <div>
            id: {user._id}, name: {user.username}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrolledList;
