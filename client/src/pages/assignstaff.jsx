import { Button, TextInput } from "flowbite-react";

export default function assignstaff() {
  return (
    <div className="=p-3 max-w-3xl mx-auto min-h-screen">
   <h2 className="'text-centre text-3xl my-7 font-semibold">Staff and Lab Allocation</h2>
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput type='text' placeholder="Enter the staff name" require id='name' className="flex-1"/>
        <select>
          <option value='skill'>select the skill</option>
          <option value='MERN'>MERN</option>
          <option value='JAVA'>java</option>
          <option value='python'>Python</option>

        </select>

      </div>
      <select>
          <option value='skill'>select the lab</option>
          <option value='cse-1'>CSE LAB-1</option>
          <option value='cse-2'>CSE LAB-2</option>
          <option value='cse-3'>CSE LAB-3</option>
          <option value='cse-4'>CSE LAB-4</option>

        </select>
        <Button className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mt-4 w-full max-w-md"type="submit" >
           SUBMIT
        </Button>


    </form>
    </div>
  )
}
