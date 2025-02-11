import { useEffect, useRef } from 'react';
import './RightColumn.css'
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function RightColumn({imgType, gridMode, imgUrl}){
    // Variable stores div which contain canvas
    const containerRef = useRef(null);

    useEffect(() => {
        // Create new Image and set source to user's img
        const img = new Image();
        img.src = imgUrl;

        img.onload = () => {
            // Set p#right-column-info element to visible
            document.getElementById('right-column-info').className = 'show';
            
            // Set height and width based on img height and weight devided by grid Mode (2, 3, 5)
            const imgWidth = img.width / gridMode;
            const imgHeight = img.height / gridMode;
            
            // Set containerReg HTML to empty
            containerRef.current.innerHTML = '';

            for(let i = 0; i < gridMode; i++){
                // Create div to hold row
                let canvasContainer = document.createElement('div');
                for(let k = 0; k < gridMode; k++){
                    // Create canvas element and set its height and width
                    const canvas = document.createElement('canvas');
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;

                    // Download the image when clicked
                    canvas.addEventListener('click', (e) => downloadCanvasImg(false, e));
                    
                    // Copy img segments and store them in canvas
                    let ctx = canvas.getContext('2d');
                    ctx.drawImage(img, k * imgWidth, i * imgHeight, imgWidth, imgHeight, 0, 0, canvas.width, canvas.height);
                    
                    // Put canvas into canvasContainer div
                    canvasContainer.appendChild(canvas);
                }
                // Put canvasContainer into containerRef
                containerRef.current.appendChild(canvasContainer);
            }
        }
    }, [gridMode, imgUrl]);

    const downloadCanvasImg = async (downloadAllImg=true, target) => {
        if(downloadAllImg){
            const zip = new JSZip();
            const extension = imgType.split('/')[1];

            // get all canvas element from #canvasContainer
            const canvasElements = document.getElementById('canvasContainer').querySelectorAll('canvas');

            canvasElements.forEach((element,index) => {
                const imgDataUrl = element.toDataURL();

                // Add image to ZIP directly form the data URL
                zip.file(`img${index}.${extension}`, imgDataUrl.split(',')[1], {base64: true});
            });

            // generate the ZIP file
            const zipBlob = await zip.generateAsync({type: 'blob'});

            // Trigger the download using FileSaver
            saveAs(zipBlob, 'img-grid.zip');
        }else{
            // Get img extension (png, jpeg, jpg) and URL to that segment
            const extension = imgType.split('/')[1];
            const imgDataUrl = target.target.toDataURL();

            // Save the image
            saveAs(imgDataUrl, `img.${extension}`);
        }
    }

    return(
        <>
            <div id='rightColumn'>
                <p id='right-column-info' className='hide'>Click on individual image that would like to download <br/> or <br/> Click on download button for all images.</p>
                <div ref={containerRef} id='canvasContainer'></div>
                {imgUrl && (
                    <button onClick={downloadCanvasImg}>Download All</button>
                )}
            </div>
        </>
    )
}