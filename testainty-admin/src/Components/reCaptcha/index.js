import ReCAPTCHA from 'react-google-recaptcha';

function ReCaptcha({ handleChangeCaptha, recaptchaRef }) {
  return (
    <div className=''>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        onChange={handleChangeCaptha}
        sitekey={process.env.REACT_APP_RECAPTCH_KEY}
      />
    </div>
  )
}

export default ReCaptcha
