const SwitchButton = ({data, status, handleStatusChange}) => {
    return (
        <div className= {`switch-btt ${status === 1 ? 'checked-y': 'checked-n'}`}>
        <input type='checkbox' name='' className='toggle' checked={status === 1 ? true : false} onChange={(event) => { handleStatusChange(event, data) }} />
        <div className='slide'></div>
      </div>
    )
}

export default SwitchButton;
