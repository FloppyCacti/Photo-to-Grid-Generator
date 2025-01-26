import './LeftColumn.css'

export default function LeftColumn({setImgType, imgUrl, setImgUrl}){
    // Get Img URL and show error
    const  handleImageUpload = (event) => {
        const file = event.target.files[0];
        if(file){
            // Get file type
            const fileType = file.type;
            const error = document.getElementById('imgLoadError');

            // Check if the file type is png, jpg, or jpeg
            if(fileType === 'image/png' || fileType === 'image/jpg' || fileType === 'image/jpeg'){
                setImgType(fileType);
                // Get image URL and send the url upstream
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImgUrl(e.target.result);
                };
                reader.readAsDataURL(file);
                // Hide the Img Load Error element 
                error.className = 'hide';
            }else{
                // Show the Img Load Error element
                error.className = 'show';
            }
        }
    }

    return(
        <>
            <div id="left-column">
                {/* add different grdi type buttons here */}
                    <h1 id='gridFormatTitle'>3x3 Grid</h1>
                    <p id='imgRequirement'>*Image must be in JPEG or PNG format.</p>
                    <div>
                        {!imgUrl ? (
                            <div id='placeholderContainer'>
                                <p id='placeholderText'>Upload Image</p>
                            </div>
                        ) : (
                            <div id='uploadedImageContainer'>
                                <img src={imgUrl} alt='Uploaded Preview' id='uploadedImage'></img>
                            </div>
                        )}
                    </div>
                    <div id='uploadImgContainer'>
                        <label id='uploadImgLabel' for='fileName'>Choose a image:</label>
                        <input id='uploadImgInput'
                               type='file'
                               name='fileName' 
                               accept='image/png, image/jpeg, image/jpg'
                               onChange={handleImageUpload}/>
                    </div>
                    <p id='imgLoadError' className='hide'>Error Loading File</p>
            </div>
        </>
    )
}