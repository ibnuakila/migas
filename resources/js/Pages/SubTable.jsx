/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
var Hello = React.createClass({
    render: function () {
        return (
                <div>
                    <tbody>
                        {myList.map((item, i) => {
                                        return (
                                                <React.Fragment key={i}>
                                                    <tr onClick={toggleMobileOpen.bind(this, i)}>
                                                        <td className="toggler">
                                                            {item.mobile_open && <ArrowUp />}
                                                    {!item.mobile_open && <ArrowDown />}
                                                    </td>
                                                    <td>{item.elem_one}</td>
                                                    <td>{item.elem_two}</td>
                                                    <td>{item.elem_three}</td>
                                                    </tr>
                                                    {item.mobile_open && (
                                                                                    <tr className="test-td">
                                                                                        <td>...</td>
                                                                                    </tr>
                                                                    )}
                                                </React.Fragment>
                                            );
                                })}
                </tbody>
                
                </div>
                );
    }
});
