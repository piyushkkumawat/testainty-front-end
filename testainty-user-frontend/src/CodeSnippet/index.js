import { useState } from 'react'
import { AiFillCopy } from 'react-icons/ai'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from 'react-hot-toast'
import { t } from 'i18next'

function CodeSnippet({ code, language }) {

  const [isCopy, setIsCopy] = useState(false)

  const copyToClipBoard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setIsCopy(true)
        toast.success(t('copiedURL'))
      })
      .catch((error) => {
        // Handle clipboard writeText error
        console.error('Clipboard writeText failed:', error)
        setIsCopy(false)
      })
    // () => {
    //     setIsCopy(false)
    // });

    setTimeout(() => {
      setIsCopy(false)
    }, 5000)
  }

  return (
    <div className="relative">
      <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>
      <div
        className={`text-xs absolute right-3 top-2 text-primary ml-5 px-3 py-1  cursor-pointer text-center flex justify-center items-center font-semibold ${
          isCopy ? 'text-success' : 'text-primary'
        }`}
        onClick={copyToClipBoard}
      >
        <AiFillCopy className="text-xs sm:text-xs lg:text-xs md:text-sm xl:text-sm 2xl:text-base" />{' '}
        {` ${isCopy ? t('copied') : t('copy')}`}
      </div>

     
    </div>
  )
}

export default CodeSnippet
