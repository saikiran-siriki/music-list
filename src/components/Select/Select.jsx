import './Select.css'
export default function Select({defaultOption, setSelected, options, name }) {
    return (
        <div className="select-parent">
        <label className='select-label' htmlFor={name}>{name}</label>{' '}
        <select
            name={name}
            defaultValue={defaultOption}
            onChange={e => setSelected(e.target.value)}
        >
            <option value={-1}>{defaultOption? defaultOption: 'All'}</option>
            {
                options.map((item, index)=> {
                    return <option key={index} value={item.value}>{item.label}</option>
                })
            }
      </select>
      </div>
    )
}