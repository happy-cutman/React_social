import React, {useState} from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import V from '../../../assets/images/VVV.png'
import X from '../../../assets/images/x.jpg'
import avatar from '../../../assets/images/avatar.png'
import ProfileStatusWithHooks from './ProfileStatusHooks';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {// ! означает если значение null или undefined
        return <Preloader/>
    }

    const onUserAvatarSelected = (event) => {
          if (event.target.files.length) {
              props.saveUserAvatar(event.target.files[0])
          }
    };

    const activateEditMode = () => {
        setEditMode(true);
    };

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false)
        });

    };

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large || avatar} className={classes.profileAvatar}/>
                <div>{props.isOwner && <input type={'file'} onChange={onUserAvatarSelected}/>}</div>

                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                {editMode
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} activateEditMode={activateEditMode}/>}

            </div>
        </div>
    );
};


const ProfileData = (props) => {
    return <div>
        <div>
            {props.isOwner && <button onClick={props.activateEditMode}>edit</button>}
        </div>
        <div>
            <b>Полное имя</b>: {props.profile.fullName}
        </div>
        <div>
            <b>Обо мне</b>: {props.profile.aboutMe}
        </div>
        <div>
            <b>Ищу работу</b>:  <img className={classes.jobImg} src={props.profile.lookingForAJob ? V : X}/>
        </div>
        {props.profile.lookingForAJob &&
        <div>
            <b>Мои профессиональные навыки</b>: {props.profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>Контакты</b>: {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
        })}
        </div>
    </div>
};



export const Contact = ({contactTitle, contactValue}) => {
    return <div className={classes.contact}><b>{contactTitle}</b>: {contactValue}</div>
};
/* Object.keys в keys() подсовываем объект ключи которого нужно получить(итерируемся по объекту). Object.keys пробегается по объекту
и завернет названия свойств, которорые возвращает сервер в массив строк.
map(key => ) значит, что на базе каждого ключа(каждого имени свойста), мы отрисуем компоненту Contact.
contactTitle это и есть название контакта(git, facebook и тд)
contactValue мы обратимся к контактам и прочитаем значение свойста по ключу
*/

/*initialValues={props.profile} это начальные значения которые будут при редактировании, то есть поля будут заполнены
* предидущими введёнными данными*/

export default ProfileInfo;