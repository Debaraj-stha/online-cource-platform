import { useState, useEffect } from 'react';
import Modal from './Modal'

interface Props {
    file: File
    onClick: () => void
}

const UploadBankReciptModal = ({ file, onClick }: Props) => {
    const [preview, setPreview] = useState<string | null>(null)

    // Generate a preview URL when file changes
    useEffect(() => {
        const url = URL.createObjectURL(file)
        setPreview(url)

        // Clean up the URL when component unmounts
        return () => URL.revokeObjectURL(url)
    }, [file])

    const handleUpload = () => {
        //TODO
        console.log('Uploading file:', file)
        onClick() // close modal after upload
    }

    return (
        <Modal>
            <div className="bg-white rounded-2xl p-6 sm:my-20 shadow space-y-4 max-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 text-center">Upload Bank Receipt</h3>
                {preview && (
                    <img
                        src={preview}
                        alt="Bank Receipt Preview"
                        className="w-full h-full object-contain border rounded-md"
                    />
                )}
                <p className="text-center text-gray-600">{file.name}</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={handleUpload}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Upload
                    </button>
                    <button
                        onClick={onClick}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default UploadBankReciptModal
