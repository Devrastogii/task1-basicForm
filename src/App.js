import { useState } from "react";
import Tilt from "react-parallax-tilt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [guest, setGuest] = useState(false);
  const [guestName, setGuestName] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = (e) => {
    e.preventDefault()
    let isValid = true

    const showSuccessMessage = () => {
      toast.success("Successfully Submitted ", {
        position: "bottom-center",
      });
    };

    const showEmptyMessage = (field) => { 
      toast.error(field + " can't be left blank", {
        position: "top-right",
      });

      return false
    };

    // Regex Checks

    const showInvalidMessage = (field) => {    
      toast.error(field + " should contain valid data", {
        position: "top-right",
      });

      return false
    };

    const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
    const validateAge = (age) => /^\d{1,3}$/.test(age) && age >= 0 && age <= 120;
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // Empty Checks

    if (name == '') {
      showEmptyMessage('Name')
      isValid = false
    } else if (email == '') {
      showEmptyMessage('Email')
      isValid = false
    } else if (age == '') {
      showEmptyMessage('Age')
      isValid = false
    } else if (guest && guestName == '') {
      showEmptyMessage('Guest Name')
      isValid = false
    } else if (!validateName(name)) {    
      showInvalidMessage('Name')
      isValid = false
    } else if (!validateEmail(email)) {
      showInvalidMessage('Email')
      isValid = false
    } else if (!validateAge(age) || age <= 0) {
      showInvalidMessage('Age')
      isValid = false
    } else if (guest && !validateName(guestName)) {
      showInvalidMessage('Guest Name')
      isValid = false
    }

    if (isValid) { showSuccessMessage(); onOpen() }
  }

  return (
    <>
      <div className="w-screen h-screen bg-gray-900 relative overflow-hidden flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        <div className="w-40-r h-40-r absolute left-2/3 -top-60 rounded-full bg-gradient-to-r from-green-500 to-blue-500 animate-pulse"></div>
        <div className="w-40-r h-40-r absolute -left-20 top-96 rounded-full bg-gradient-to-r from-red-500 via-pink-400 to-purple-500 animate-pulse"></div>
        <Tilt className="container w-full max-w-xl mx-auto">
          <div className="h-auto py-6 bg-white bg-opacity-10 relative z-2 backdrop-blur-sm shadow-5xl border border-r-0 border-b-0 border-opacity-30 backdrop-filter rounded-2xl">
            <form className="flex flex-col text-white justify-center items-center px-10">
              <div className="font-semibold text-2xl tracking-wider">
                <h1>REGISTRATION FORM</h1>
              </div>
              <div className="mt-10 w-full">
                <label className="tracking-wider text-zinc-200 text-sm">Name: </label>
                <br />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-3/4 text-white mt-2 bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"
                />
              </div>

              <div className="mt-4 w-full">
                <label className="tracking-wider text-zinc-200 text-sm">Email Address: </label>
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-3/4 text-white mt-2 bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm"
                />
              </div>

              <div className="mt-4 w-full">
                <label className="tracking-wider text-zinc-200 text-sm">Age: </label>
                <br />
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="w-3/4 text-white mt-2 bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"
                />
              </div>

              <div className="mt-4 w-full">
                <label className="tracking-wider text-zinc-200 text-sm">Are you attending with guest: </label>
                <input
                  type="checkbox"
                  checked={guest}
                  onChange={(e) => setGuest(e.target.checked)}
                  className="text-white ml-2 text-sm"
                />
              </div>

              {guest ? (
                <div className="mt-4 w-full">
                  <label className="tracking-wider text-zinc-200 text-sm">Guest Name: </label>
                  <br />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Guest Name"
                    className="w-3/4 text-white mt-2 bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"
                  />
                </div>
              ) : null}

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-gray-800 w-20 h-8 rounded-md transition-all hover:border-white hover:border"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Tilt>
      </div>

      <ToastContainer />

      <AlertDialog motionPreset='slideInBottom' isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Submitted Data</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>

          <div><span className="font-semibold">Name:</span> {name}</div>
          <div><span className="font-semibold">Email Address:</span> {email}</div>
          <div><span className="font-semibold">Age:</span> {age}</div>

          {guest && <>
            <div><span className="font-semibold">Guest Name:</span> {guestName}</div>
          </>}
  
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>           
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default App;
