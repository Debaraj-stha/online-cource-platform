import esewa from "../assets/images/esewa_logo.png"
import khalti from "../assets/images/khalti.png"
import banktransfer from "../assets/images/bank-transfer.svg"
import Modal from './Modal'
import { useState } from "react"
import UploadBankReciptModal from "./UploadBankReciptModal"

interface Props {
    onClose: () => void
}

interface CardProps {
    image: string
    text: string
    onClick?: () => void
    extraText?: string
}

const Card = ({ image, text, onClick, extraText }: CardProps) => (
    <button
        onClick={onClick}
        aria-label={`Select ${text} as payment method`}
        className="flex items-center gap-3 border rounded-xl p-4 hover:bg-gray-100 transition w-full text-black text-left"
    >
        <img
            src={image}
            loading="lazy"
            alt={text}
            className="w-14 h-14 object-contain"
        />
        <div className="flex flex-col">
            <span className="font-medium">{text}</span>
            {extraText && <small className="text-sm text-gray-500">{extraText}</small>}
        </div>
    </button>
)

const PaymentMethodModal = ({ onClose }: Props) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    // Pick receipt of bank
    const pickInput = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/png,image/jpg,image/jpeg"

        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement
            if (target.files && target.files[0]) {
                setSelectedFile(target.files[0])
            }
        }

        input.click()

    }

    const paymentMethods: CardProps[] = [
        { image: esewa, text: "E-sewa", onClick: () => console.log("E-sewa clicked") },
        { image: khalti, text: "Khalti", onClick: () => console.log("Khalti clicked") },
        {
            image: banktransfer,
            text: "Bank Transfer",
            onClick: pickInput,
            extraText: "Upload a copy of the bank transfer receipt",
        },
    ]

    return (
        <>
            <Modal>
                <div className="bg-white rounded-2xl px-6 py-8 space-y-6 sm:my-20 shadow">
                    <h3 className="text-2xl font-bold text-gray-800 text-center">
                        Choose Payment Method
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {paymentMethods.map((method, idx) => (
                            <Card key={idx} {...method} />
                        ))}
                    </div>
                </div>
            </Modal>

            {selectedFile && (
                <UploadBankReciptModal
                    file={selectedFile}
                    onClick={() => {
                        setSelectedFile(null)
                        onClose() //also close previous modal
                    }} // close upload modal
                />
            )}
        </>
    )
}

export default PaymentMethodModal
