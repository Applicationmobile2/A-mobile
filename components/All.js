import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'; // Import Dimensions
import { Alert } from 'react-native';
import Axios from 'axios';
import Update from './Update.js';
import { AntDesign } from '@expo/vector-icons';

export default function All() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [ref, setRef] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [newTask, setNewTask] = useState('');
  const [desTask, setDesTask] = useState('');
  const triggerRefresh = () => setRefresh(current => current + 1);

  const add = () => {
    Axios.post("http://192.168.1.40:3000/api/add", { TaskName: newTask, Description: desTask })
      .then((response) => {
        console.log(response);
        triggerRefresh(); // Trigger data refresh
        setNewTask(''); // Clear inputs
        setDesTask('');
      })
      .catch((err) => console.log(err));
  };

  const update = (obj, id) => {
    Axios.put(`http://192.168.1.40:3000/api/upd/${id}`, obj)
      .then(() => {
        triggerRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            Axios.delete(`http://192.168.1.40:3000/api/del/${id}`)
              .then(() => {
                console.log('Deleted Task ID:', id);
                setRefresh(!refresh);
              })
              .catch((err) => console.log(err));
          }
        }
      ]
    );
  };

  const handleClick = (id) => {
    console.log('You clicked me with id:', id); // Check the value of id
    if (id === ref) {
      setRef('');
      setShow(false);
    } else {
      setRef(id);
      setShow(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://192.168.1.40:3000/api/getAll");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);



  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setNewTask}
          value={newTask}
          placeholder="New task..."
        />
        <TextInput
          style={styles.input}
          onChangeText={setDesTask}
          value={desTask}
          placeholder="Task description..."
        />
      </View>
      <AntDesign name="checkcircle" size={24} color="black" onPress={add} />
      <ScrollView style={styles.taskList}>
        <View> 
          {data.map((el) => (
            <View style={styles.taskItem} key={el.TaskID}>
              <Text style={styles.taskName}>{el.TaskName}</Text>
              <Text style={styles.description}>{el.Description}</Text>
              <View style={styles.iconContainer}>
              <AntDesign name="sync" size={24} color="black" onPress={() => handleClick(el.TaskID)} />
                <AntDesign name="delete" onPress={() => deleteItem(el.TaskID)} size={24} color="black" />
              </View>
              {ref === el.TaskID && show ? (
                <Update id={el.TaskID} update={update} setRefresh={setRefresh} refresh={refresh} />
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 5,
  },
  input: {
    marginBottom: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  taskList: {
   maxHeight: '80%',
   width: '100%',
  },
  taskItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  taskName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#555',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, 
});
