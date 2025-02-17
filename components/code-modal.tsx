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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-all duration-300">
      <div className="bg-white dark:bg-dark w-full max-w-2xl rounded-lg shadow-lg overflow-hidden animate-zoom-in">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">{code}</pre>
        </div>
      </div>
    </div>
  )
}

