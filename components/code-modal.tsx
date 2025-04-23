import { X } from "lucide-react"

interface CodeModalProps {
  isOpen: boolean
  onClose: () => void
  code: string
  title: string
}

export function CodeModal({ isOpen, onClose, code, title }: CodeModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div className="relative bg-[#EBE6FA] dark:bg-[#2B2B3B] w-full max-w-2xl rounded-lg shadow-lg overflow-hidden animate-zoom-in">
        <div className="flex justify-between items-center p-4 border-b border-[#D8BFD8] dark:border-[#483D8B]">
          <h3 className="text-lg font-semibold text-[#4B0082] dark:text-[#E8DAD6]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-[#4B0082] hover:text-[#483D8B] dark:text-[#E8DAD6] dark:hover:text-[#BCB6CB] transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto bg-[#F5F0FF] dark:bg-[#1E1E2E]">
          <pre className="text-sm text-[#4B0082] dark:text-[#E8DAD6] whitespace-pre-wrap break-words">
            {code}
          </pre>
        </div>
      </div>
    </div>
  )
}

