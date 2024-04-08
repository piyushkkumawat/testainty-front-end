/*eslint-disable no-undef*/
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import { apiConstants } from '../../Constants/api.constant';

function DescriptionEditorModal({
  isShow,
  setIsShow,
  questionDescription,
  setQuestionDescription,
  setIsCodeEditorMode
}) {
  const toggle = () => setIsShow(!isShow);

  const handleChange = (content) => {
    if(content){
      setIsCodeEditorMode(true)
    }else{
      setIsCodeEditorMode(false)
    }
    
    // if (content) {
      setQuestionDescription(content);
    // }
  };

  const handleImageUpload = async (blobInfo, success, failure) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
    const api = `${
      process.env.REACT_APP_API_URL + apiConstants.UPLOAD_IMAGE_EDITOR
    }`;
    try {
      const response = await fetch(api, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      const awsImageUrl = data.file;
      success(awsImageUrl);
    } catch (error) {
      failure('Image upload failed');
    }
  };
  return (
    <Modal size="lg" isOpen={isShow} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div className="flex items-center justify-between">
          <div>Add Description</div>
        </div>
      </ModalHeader>
      <ModalBody>
        <Editor
          id="file-picker"
          name="questionDecription"
          apiKey={process.env.REACT_APP_TINY_API_KEY}
          value={questionDescription ? questionDescription : ''}
          init={{
            selector: 'textarea',
            // menu: {
            //     edit: { title: 'Edit', items: 'undo, redo, selectall' }
            //   },
            plugins:
              'anchor autolink codesample emoticons image link lists media searchreplace table visualblocks wordcount',
            // plugins: 'tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker a11ychecker typography inlinecss',
            // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            // toolbar: ' undo redo | link image | code',
            toolbar:
              'undo redo | bold italic underline | numlist bullist | link image',
            /* enable title field in the Image dialog*/
            image_title: true,
            automatic_uploads: true,
            file_picker_types: 'image',
            file_picker_callback: (cb, value, meta) => {
              // Provide image and alt text for the image dialog
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                  /*
                                      Note: Now we need to register the blob in TinyMCEs image blob
                                      registry. In the next release this part hopefully won't be
                                      necessary, as we are looking to handle it internally.
                                    */
                  const id = 'blobid' + new Date().getTime();
                  const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                  const base64 = reader.result.split(',')[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  // Upload the image to AWS and replace the base64 with the AWS URL
                  handleImageUpload(
                    blobInfo,
                    (awsImageUrl) => {
                      // Replace the base64 with the AWS URL
                      if (meta.filetype === 'image') {
                        cb(awsImageUrl, { alt: 'My alt text' });
                      }

                      // cb(blobInfo.blobUri(), { title: file.name, source: awsImageUrl });
                    },
                    (errorMessage) => {
                      // Handle failure, you might want to display an error message
                      console.error('Image upload failed:', errorMessage);
                    }
                  );

                  /* call the callback and populate the Title field with the file name */
                  // cb(blobInfo.blobUri(), { title: file.name });
                });
                reader.readAsDataURL(file);
              });

              input.click();
            },
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
          }}
          onEditorChange={(content) => {
            handleChange(content);
          }}
        />
      </ModalBody>
    </Modal>
  );
}

export default DescriptionEditorModal;
/*eslint-enable no-undef*/
