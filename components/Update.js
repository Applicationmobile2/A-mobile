import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Button, TextInput, View, StyleSheet } from 'react-native';

const Update = ({ id, update }) => {
  const [newTask, setNewTask] = useState('');
  const [desTask, setDesTask] = useState('');
  const handleUpdate = () => {
    const updatedData = { TaskName: newTask, Description: desTask };
    update(updatedData, id);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setNewTask}
        value={newTask}
        placeholder="Update task name..."
      />
      <TextInput
        style={styles.input}
        onChangeText={setDesTask}
        value={desTask}
        placeholder="Update task description..."
      />
       <AntDesign name="like1" size={24} color="black"  onPress={handleUpdate} />
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});
