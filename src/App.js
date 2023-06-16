import logo from './logo.svg';
import './App.css';
import Calendar from 'react-calendar';
import {useState} from "react";
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";


function App() {
  let subtitle;
  const disabledDates = [
    new Date(2023, 5, 15),
    new Date(2023, 5, 16),
  ];
  const { register, handleSubmit } = useForm();
  const [value, onChange] = useState(new Date());
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const onSubmit = (data) => {
        setData(JSON.stringify(data))
      console.log(data);
    }

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'royalblue';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div id="app">
      <header className="App-header">
        <Calendar
            onChange={onChange}
            value={value}
            tileDisabled={({date, view}) =>
                (view === "month" && date.getDay() === 0) ||
                date < new Date() ||
                date.getDay() === 6 ||
                disabledDates.some(disabledDate =>
                    date.getDate() === disabledDate.getDate())
            }
        />
        <button onClick={openModal}>Formularz rezerwacji</button>
        <Modal
            appElement={document.getElementById('app')}
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Witaj!</h2>
          <button onClick={closeModal}>close</button>
          <div>Jeśli chcesz wypożyczyć jacht, zapraszamy do wypełnienia formularza osobowego</div>
          <form onSubmit={handleSubmit(onSubmit)}>

              <label>
                  Imię
                  <input
                      type="string"
                      placeholder=" "
                      {...register("name")}
                  />
              </label>
              <label>
                  Nazwisko
                  <input
                      type="string"
                      placeholder=" "
                      {...register("surName")}
                  />
              </label>
              <label>
                  Data urodzenia
                  <input
                      type="number"
                      placeholder="    /  / "
                      {...register("dateOfBirth")}
                  />
              </label>
              <label>
                  Numer licencji sternika
                  <input
                      type="number"
                      placeholder=" "
                      {...register("licenceNumber")}
                  />
              </label>
              <button type='submit' > WYŚLIJ </button>
          </form>
        </Modal>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
