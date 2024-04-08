const SwitchButton = ({data, status, handleStatusChange, title}) => {
    return (
        <div className= {`switch-btt cursor-pointer ${status === 1 ? 'checked-y': 'checked-n'}`} title={title}>
        <input type='checkbox' name='' className='toggle cursor-pointer' checked={status === 1 ? true : false} onChange={(event) => { handleStatusChange(event, data) }} />
        <div className='slide cursor-pointer'></div>
      </div>
    )
}

export default SwitchButton;
