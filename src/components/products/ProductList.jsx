import React from 'react'

const ProductList = () => {
    return (
        <div className="content-wrapper">

            <div className="card">

                <div className="card-header">
                    <h3 className="card-title"></h3>
                </div>
                <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>user</th>
                                <th>Register</th>
                                <th>Admin</th>
                                <th>Registation Form</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.user}>
                                    <td>{product.Register}</td>
                                    <td>{product.Admin}</td>
                                    <td>{product.RegistationForm}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductList;