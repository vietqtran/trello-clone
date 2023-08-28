import Image from 'next/image'
import React from 'react'
import { SlArrowLeft } from 'react-icons/sl'
import { TfiClose } from 'react-icons/Tfi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import Background from './Background'
import { useState } from 'react'
import BackgroundSelect from './BackgroundSelect'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

type Props = {
   setShow: Function,
   type: string
}

type Inputs = {
   title: string,
   workspace: string,
}

const options = [
   { value: 'Workspace 1', label: 'Workspace 1' },
   { value: 'Workspace 2', label: 'Workspace 2' },
   { value: 'Workspace 3', label: 'Workspace 3' },
   { value: 'Workspace 4', label: 'Workspace 4' },
   { value: 'Workspace 5', label: 'Workspace 5' }
]

function CreateBoard(props: Props) {

   const [selectBg, setSelectBg] = useState({ ntn: 1, type: 'image' })
   const [showSelectBg, setShowSelectBg] = useState(false)
   const [title, setTitle] = useState('')

   const {
      register,
      handleSubmit,
      watch,
      control,
      formState: { errors },
   } = useForm<Inputs>()
   const onSubmit: SubmitHandler<Inputs> = (data) => { }

   return (
      <>
         <div className={`text-black ${props.type === 'button' ? 'sticky right-[100%] left-0' : 'absolute'} bg-white top-[calc(100%+10px)] min-w-[306px] left-[-100px] md:left-[-20px] p-1 drop-menu-shadow rounded-md`}>
            <div className='flex items-center justify-between text-gray-600'>
               <span className='p-3 rounded-md hover:bg-slate-100 cursor-pointer' onClick={() => {
                  props.setShow({ show: true, tab: '' })
               }}><SlArrowLeft /></span>
               <span className='font-semibold'>Create board</span>
               <span className='p-3 rounded-md hover:bg-slate-100 cursor-pointer' onClick={() => {
                  props.setShow({ show: false, tab: '' })
               }}><TfiClose /></span>
            </div>
            <div className={`relative my-2 aspect-video w-[250px] mx-auto rounded-md overflow-hidden flex items-center justify-center`}>
               <Image className='w-full h-full object-cover' src={`/assets/background/bg-${selectBg.type}/bg${selectBg.ntn}.jpg`} alt='bg-preview' width={200} height={150} />
               <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                  <Image src={'/assets/other/preview-top.svg'} width={500} height={300} alt='preview' />
               </div>
            </div>
            <div className='px-3 relative'>
               <h1 className='text-gray-600 font-bold text-xs mt-3 mb-1'>Background</h1>
               <div>
                  <div className='grid grid-cols-4 gap-1'>
                     <Background ntn={1} type={'image'} setSelectBg={setSelectBg} selectBg={selectBg} />
                     <Background ntn={2} type={'image'} setSelectBg={setSelectBg} selectBg={selectBg} />
                     <Background ntn={3} type={'image'} setSelectBg={setSelectBg} selectBg={selectBg} />
                     <Background ntn={4} type={'image'} setSelectBg={setSelectBg} selectBg={selectBg} />
                  </div>
                  <div className='grid grid-cols-6 gap-1 mt-2'>
                     <Background ntn={1} type='gradient' setSelectBg={setSelectBg} selectBg={selectBg} />
                     <Background ntn={2} type='gradient' setSelectBg={setSelectBg} selectBg={selectBg} />
                     <Background ntn={3} type='gradient' setSelectBg={setSelectBg} selectBg={selectBg} />
                     <Background ntn={4} type='gradient' setSelectBg={setSelectBg} selectBg={selectBg} />
                     <Background ntn={5} type='gradient' setSelectBg={setSelectBg} selectBg={selectBg} />
                     <div className='cursor-pointer col-span-1 bg-slate-100 hover:bg-slate-300 flex items-center justify-center rounded-md overflow-hidden h-[30px]'
                        onClick={() => {
                           setShowSelectBg(!showSelectBg)
                        }}
                     >
                        <HiOutlineDotsHorizontal />
                     </div>
                  </div>
               </div>
               {/* absolute  */}
               {showSelectBg && <BackgroundSelect setShowSelectBg={setShowSelectBg} setSelectBg={setSelectBg} selectBg={selectBg} />}

               <div>
                  {/* TODO */}
                  <form onSubmit={handleSubmit(onSubmit)} className='w-full mb-3 flex flex-col items-start mt-3 justify-center'>
                     <label htmlFor="title" className='font-bold text-xs'>Board title <span className='text-red-600'>*</span></label>
                     <input type="text"
                        id='title'
                        className={`block w-full p-2 outline-none ${title ? 'border-blue-500' : 'border-red-500'} border-2 rounded-md`}
                        defaultValue={title}
                        {...register("title", { required: true })}
                        onChange={(e) => {
                           setTitle(e.target.value)
                        }}
                        name='title'
                     />
                     {!title && <span className='text-sm'>👋
                        Board title is required</span>}
                     <label htmlFor="workspace" className='font-bold text-xs mt-3'>Workspace</label>
                     <select {...register("workspace")}
                        name="workspace" id="workspace" className='overflow-y-scroll w-full outline-none p-2 border-slate-400 border-2 rounded-md'>
                        {options.map((o) => {
                           return <option key={o.value} value={o.value} className='p-2 flex flex-col' defaultChecked>
                              {o.label}
                           </option>
                        })}
                     </select>
                     <button type={title ? 'submit' : 'button'} className={`w-full py-2 rounded-md mt-3 ${title ? 'bg-blue-500 text-white' : 'bg-slate-200 cursor-not-allowed text-gray-500'}`}>Create</button>
                  </form>
               </div>
            </div>
         </div >
      </>
   )
}

export default CreateBoard