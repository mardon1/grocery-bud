import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const localData = localStorage.getItem('meals')
  const [name, setName] = useState('');
  const [list, setList] = useState(localData? JSON.parse(localData): []);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: 'hello world', type: 'success' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({ show: true, msg: 'please enter value', type: 'danger' });
    } else if (name && isEditing) {
      setList(list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name };
        }
        return item;
      }));
      setName('');
      setEditID(null);
      setIsEditing(false);
      setAlert({ show: true, type: 'success', msg: "value changed" });
    } else {
      setAlert({ show: true, msg: 'item added to the list', type: 'success' });
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAlert({ show: false, msg: '', type: '' });
    }, 3000);
    return () => {
      clearTimeout(interval);
    };
  }, [alert]);

    useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(list))
  })

  const clearItems = () => {
    setAlert({ show: true, msg: 'empty list', type: 'danger' });
    setList([]);
  };

  const removeItem = (idd) => {
    setAlert({ show: true, msg: 'item removed', type: 'danger' });
    setList(list.filter((item) => item.id !== idd));
    localStorage.removeItem(list)
  };

  const editItem = (idd) => {
    const specificItem = list.find((item) => item.id === idd);
    setIsEditing(true);
    setEditID(idd);
    setName(specificItem.title);
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit} >
        {alert.show && <Alert alert={alert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" className="grocery" placeholder="e.g. eggs" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="submit-btn" type='submit'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 &&
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem}></List>
          <button className="clear-btn" onClick={clearItems}>clear items</button>
        </div>
      }
    </section>
  );
}

export default App;
