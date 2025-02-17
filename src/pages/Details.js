<h2 className="text-center mb-4">Ajouter une Soumission</h2>
<div className="row mb-4">
    <div className="col-md-8 offset-md-2">
        <form className="contact-form p-4 border rounded shadow" onSubmit={handleSubmit}>
            <h4 className="text-center mb-4">Formulaire de Soumission</h4>
            <div className="form-group">
                <label htmlFor="company">Entreprise</label>
                <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    className="form-control" 
                    value={formData.company} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="from">De</label>
                <input 
                    type="text" 
                    id="from" 
                    name="from" 
                    className="form-control" 
                    value={formData.from} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="to">À</label>
                <input 
                    type="text" 
                    id="to" 
                    name="to" 
                    className="form-control" 
                    value={formData.to} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="kilos">Kilos</label>
                <input 
                    type="number" 
                    id="kilos" 
                    name="kilos" 
                    className="form-control" 
                    value={formData.kilos} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="departure_date">Date de départ</label>
                <input 
                    type="date" 
                    id="departure_date" 
                    name="departure_date" 
                    className="form-control" 
                    value={formData.departure_date} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Prix</label>
                <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    className="form-control" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Soumettre</button>
        </form>
    </div>
</div>

<div className="submissions">
    <h3 className="text-center mb-4">Soumissions</h3>
    <table className="table table-striped table-bordered">
        <thead className="thead-dark">
            <tr>
                <th>Entreprise</th>
                <th>De</th>
                <th>À</th>
                <th>Kilos</th>
                <th>Date de départ</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
            {submissions.map((submission, index) => (
                <tr key={index}>
                    <td>{submission.company}</td>
                    <td>{submission.from}</td>
                    <td>{submission.to}</td>
                    <td>{submission.kilos}</td>
                    <td>{submission.departure_date}</td>
                    <td>{submission.price}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
