const RadioInput = ({ name, label, value, register, errors,isSelected }) => {
    return (
      <>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            value={value}
            id={`${name}-${label.replace(/\s+/g, '-').toLowerCase()}`}
            {...register(name)}
            defaultChecked={isSelected}
          />
          <label className="form-check-label" htmlFor={`${name}-${label.replace(/\s+/g, '-').toLowerCase()}`}>
            {label}
          </label>
          {errors[name] && <p className="text-danger">{errors[name]?.message}</p>}
        </div>
      </>
    );
  };
  
  export default RadioInput;
  /*
  useEffect(()=>{
    const fetchData = async (PortfolioId) =>{
        try {
          const productsData = await axios.get(`/${PortfolioId}/products`);
          console.log(productsData);
        } catch (error) {
         console.log(error);
         notify({ message: JSON.parse(error.request.response).message, status: 'warning' });
        }
      
    }
      fetchData();
  },[]);
  */