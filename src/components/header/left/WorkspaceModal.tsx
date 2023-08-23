import Image from 'next/image'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import React, { useState, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { GrClose } from 'react-icons/gr'

type Inputs = {
   title: string,
   workspace: string,
   description: string,
}

type Props = {
   setShowModal: Function
}

const options = [
   { value: 'Operations', label: 'Operations' },
   { value: 'Marketing', label: 'Marketing' },
   { value: 'Human Resources', label: 'Human Resources' },
   { value: 'Small Business', label: 'Engineering-IT' },
   { value: 'Education', label: 'Education' },
   { value: 'Sales CRM', label: 'Sales CRM' },
   { value: 'Other', label: 'Other' }
]


function WorkspaceModal(props: Props) {

   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowModal({ show: false, type: '' })
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)

   const {
      register,
      handleSubmit,
      watch,
      control,
      formState: { errors },
   } = useForm<Inputs>()
   const onSubmit: SubmitHandler<Inputs> = (data) => { console.log(data) }

   const [title, setTitle] = useState('')
   const [workspace, setWorkspace] = useState('')

   return (
      <div className=' p-5 w-full h-fit min-h-[100vh] top-0 left-0 right-0 bottom-0 absolute bg-black bg-opacity-75 flex items-center justify-center'>
         <div className={`relative w-full md:bg-[url('/assets/other/workspace-modal-bg.png')] bg-[url('/assets/other/workspace-modal-bg-mobile.png')] bg-no-repeat bg-cover rounded-md bg-white container lg:mx-40 md:mx-20 grid grid-cols-2`}
            onClick={handleClickInside}
            ref={ref}
         >
            <span
               onClick={handleClickOutside}
               className='absolute right-0 m-2 p-3 hover:bg-white cursor-pointer rounded-md'><GrClose /></span>
            <div className='lg:col-span-1 col-span-2 flex items-start justify-center md:px-20 px-5 py-10 flex-col md:order-1 order-2'>
               <h1 className='font-semibold text-2xl mb-2'>
                  {`Let's build a Workspace`}
               </h1>
               <p className='text-lg font-semibold leading-6 mb-5'>Boost your productivity by making it easier for everyone to access boards in one location.</p>
               <form onSubmit={handleSubmit(onSubmit)} className=' w-full mb-3 flex flex-col items-start mt-3 justify-center'>
                  <label htmlFor="title" className='font-bold text-xs mb-2'>Workspace name <span className='text-red-600'>*</span></label>
                  <input type="text"
                     id='title'
                     className={`block w-full p-2 outline-none border-2 focus:border-blue-500 rounded-md`}
                     value={title}
                     {...register("title", { required: true })}
                     name='title'
                     placeholder={`Taco's Co.`}
                     onChange={(e) => {
                        setTitle(e.target.value)
                     }}
                  />
                  <span className='text-xs mt-2'>This is the name of your company, team or organization.</span>
                  <label htmlFor="workspace" className='font-bold text-xs mt-3 mb-2'>Workspace type</label>
                  <select {...register("workspace", { required: true })}
                     value={workspace}
                     onChange={(e) => {
                        setWorkspace(e.target.value)
                     }}
                     name="workspace" id="workspace" className='w-full outline-none p-2 focus:border-blue-500 border-2 rounded-md'>
                     <option hidden value={""} defaultChecked>Choose...</option>
                     {options.map((o) => {
                        return <option key={o.value} value={o.value}>
                           {o.label}
                        </option>
                     })}
                  </select>
                  <label htmlFor="description" className='font-bold text-xs mb-2 mt-3'>Workspace description <span className='text-red-600'>*</span></label>
                  <textarea
                     id='description'
                     className={`block w-full p-2 outline-none border-2 focus:border-blue-500 rounded-md min-h-[150px]`}
                     defaultValue={''}
                     {...register("description")}
                     name='description'
                     placeholder={`Our team organizes everything here.`}
                  />
                  <span className='text-xs mt-2'>Get your members on board with a few words about your Workspace.</span>
                  <button type={(title !== '' && workspace !== '') ? 'submit' : 'button'}
                     className={`w-full py-2 rounded-md mt-3  ${(title !== '' && workspace !== '') ? 'bg-blue-500 text-white  hover:bg-blue-400' : 'bg-slate-200 text-gray-500 cursor-default'}`}>
                     Create
                  </button>
               </form>
            </div>
            <div className=' lg:col-span-1 col-span-2 flex items-center justify-center md:order-2 order-1'>
               <div className='relative'>
                  <Image src={'/assets/other/preview-workspace-modal.svg'} width={400} height={400} alt='preview' />
                  <Image
                     className='absolute left-[20px] bottom-[10px]'
                     src={'/assets/other/preview-workspace-modal-face.svg'} width={100} height={100} alt='preview' />
               </div>
            </div>
         </div>
      </div>
   )
}

export default WorkspaceModal