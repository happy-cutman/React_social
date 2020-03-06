import React from 'react';
import classes from './ProfileInfo.module.css'
import {usersAPI} from '../../../api/api';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status // берёт своё начальное значение из пропсов и отображает на страничке
    };

    // объявляем метод с помощью стрелочной функции чтобы при передаче его в onClick не потерять контекст, если использовать обчный синтаксис, тогда нужно биндить onClick=this.activateEditMode.bind(this)
    // setState медот из React.Component
    activateEditMode = () => {
        this.setState({ // меняет свойство state
            editMode: true
        })
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    };

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value // c спомощью e узнаём какое значение и сетаем его в локальный state и при каждом нажатии будем менять локальный state
        })
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) { /* проверяет если в предыдущих пропсах статус не такой как в текущих пропсах, тогда мы новый статус синхронизируем в state */
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        console.log('render');
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span onClick={this.activateEditMode}>{this.props.status || '.......'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                    </div>
                }
            </>
        );
    }
}

export default ProfileStatus;