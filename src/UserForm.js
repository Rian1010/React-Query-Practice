import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as api from './usersApi';

const UserForm = ({ user, setIsEditing }) => {
  const [fields, setFields] = useState({ ...user });

  //   Get the cache of the data
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(api.updateUser, {
    //   Optimistic Update: onMutate immediately recreates data to what is submitted on the form VISUALLY only
    onMutate: (updatedUser) => {
      queryClient.setQueryData(['user', user.id], updatedUser);
    },
    // Response data
    onSuccess: (data) => {
      queryClient.setQueryData(['user', user.id], data);
      setIsEditing(false);

      // Trigger the old data to be updated
      //   queryClient.invalidateQueries(['user', user.id]);
      //   setIsEditing(false);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(fields);

    mutate(fields);
  };

  if (isLoading) {
    return 'Saving changes...';
  }

  return (
    <div style={{ paddingTop: 20 }}>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          name='name'
          type='text'
          value={fields.name}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 20 }}
        />

        <label>Details: </label>
        <input
          name='name'
          type='text'
          value={fields.details}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 20 }}
        />

        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default UserForm;
