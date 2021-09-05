import React, { useState } from 'react';
import { useQuery } from 'react-query';
import * as api from './usersApi';
import UserForm from './UserForm';

const UserDetails = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery(['user', userId], () => api.getUser(userId), {
    // Only run if userId is provideds
    enabled: Boolean(userId),
  });

  if (!userId) {
    return 'Select a user.';
  }

  if (isLoading) {
    return 'Loading user details';
  }
  return (
    <div>
      {isFetching && 'Background refetching'}

      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'CANCEL' : 'EDIT'}
      </button>

      {isEditing ? (
        <UserForm user={user} setIsEditing={setIsEditing} />
      ) : (
        <div>
          <h2>{user.name}</h2>
          <p>{user.details}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
