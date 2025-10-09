import React from 'react'
import PopupWindow from '../PopupWindow'


const DeleteCourse = () => {
    const [isDeleted, setIsDeleted] = React.useState(false);
   

    return (
        <div>
            {isDeleted ? (
                <PopupWindow animationClass='animate-slide-up animate-scale-up'>
                    <div
                        className={`space-y-2`}
                    >
                        <h2 className='text-xl font-semibold text-gray-700'>Course Deleted</h2>
                        <p className='text-gray-600'>The course has been successfully deleted.</p>
                        <div className='flex justify-end'>
                            <button
                                onClick={() => setIsDeleted(false)}
                                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </PopupWindow>
            ) : (
                <PopupWindow>
                    <div className='space-y-4'>
                        <h2 className='text-xl font-semibold text-gray-700'>
                            Are you sure you want to delete this course?
                        </h2>
                        <p className='text-gray-600'>
                            This action cannot be undone. All the data related to this course will be permanently deleted.
                        </p>
                        <div className='flex justify-end space-x-2'>
                            <button
                                onClick={() => setIsDeleted(false)}
                                className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors disabled:opacity-50'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsDeleted(true)}
                                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </PopupWindow>
            )}
        </div>
    );
};

export default DeleteCourse
