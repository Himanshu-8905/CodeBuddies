import { BiMenu } from "react-icons/bi"
import { useEffect, useState } from "react"
import { MdDeleteOutline } from "react-icons/md"
import { FaSave } from "react-icons/fa"
import { AiFillFolderOpen } from "react-icons/ai"
import { toast } from "react-hot-toast"

const Menu = ({ clearCanvas, setStrokeWidth, strokeWidth, canvasColor, setCanvasColor, setElements, elements, updateCanvas }) => {
    const saveFile = () => {
        const data = JSON.stringify(elements)
        console.log(data)
        const blob = new Blob([data], { type: 'application/ink' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = 'drawing.ink'
        link.href = url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const loadFile = () => {
        const input = document.createElement('input');
        input.type = 'file';

        input.accept = '.ink';

        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const fileName = file.name;
                if (fileName.endsWith('.ink')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const data = JSON.parse(event.target.result);
                        setElements(data);
                        updateCanvas(data);
                    };
                    reader.readAsText(file);
                    toast('File Loaded Successfully',
                        {
                            icon: '📁',
                            style: { borderRadius: '10px', background: '#333', color: '#fff' },
                        }
                    )
                } else {
                    alert('Please select a valid .ink file.');
                }
            }
        };

        input.click();
    };

    useEffect(() => {
        clearCanvas()
    }, [canvasColor])

    const [showMenu, setShowMenu] = useState(false)
    return (
        <div className="fixed bottom-4 right-4 bg-secondary rounded-lg p-2 flex flex-row gap-2 z-20">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex text-2xl items-center rounded-lg justify-center p-2 border-black cursor-pointer font-extrabold text-[#A6ABBD] active:text-primary">
                <BiMenu />
            </button>
            {
                showMenu && (
                    <div className="absolute bottom-12 right-0 flex flex-col w-[150px] bg-secondary rounded-lg p-2 gap-1 z-40 shadow-lg">
                        <button onClick={clearCanvas} className="flex items-center text-sm p-2 rounded-lg cursor-pointer font-extrabold text-[#b9bed0] hover:bg-slate-600 active:text-primary active:bg-tertiary">
                            <MdDeleteOutline size={25} className="text-pink-900" /> Clear Canvas
                        </button>
                        <hr className="border-gray-500" />
                        <button onClick={saveFile} className="flex gap-2 items-center text-base p-2 rounded-lg cursor-pointer font-extrabold text-[#b9bed0] hover:bg-slate-600 active:text-primary active:bg-tertiary">
                            Save File <FaSave size={15} className="text-gray-300" />
                        </button>
                        <hr className="border-gray-500" />
                        <button onClick={loadFile} className="flex gap-2 items-center text-base p-2 rounded-lg cursor-pointer font-extrabold text-[#b9bed0] hover:bg-slate-600 active:text-primary active:bg-tertiary">
                            Open File <AiFillFolderOpen size={17} className="text-gray-300" />
                        </button>
                        <hr className="border-gray-500" />
                        <label className="text-[#b9bed0]">
                            Stroke Width &nbsp; {strokeWidth}
                        </label>
                        <input onChange={(e) => setStrokeWidth(e.target.value)} type="range" value={strokeWidth} min={0} max="100" className="range cursor-pointer" />
                        <hr className="border-gray-500 mt-2" />
                        <p className="text-white">Change Canvas</p>
                        <div className="flex flex-row gap-2">
                            {/* <button onClick={() => setCanvasColor("#ffffff")} className={`w-8 h-8 rounded-lg bg-white cursor-pointer ${canvasColor === "#ffffff" ? " border-primary border" : ''}`}></button>
                            <button onClick={() => setCanvasColor("#000000")} className={`w-8 h-8 rounded-lg bg-black cursor-pointer ${canvasColor === "#000000" ? " border-primary border" : ''}`}></button>
                            <button onClick={() => setCanvasColor("#1f3d36")} className={`w-8 h-8 rounded-lg bg-[#1f3d36] cursor-pointer ${canvasColor === "#1f3d36" ? " border-primary border" : ''}`}></button> */}
                            <button onClick={() => setCanvasColor("#121212")} className={`w-8 h-8 rounded-lg bg-[#121212] cursor-pointer ${canvasColor === "#121212" ? " border-primary border" : ''}`}></button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Menu
