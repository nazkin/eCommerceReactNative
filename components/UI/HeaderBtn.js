import React from 'react'
import {HeaderButton} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'
import colors from '../../constants/colors'

const HeaderBtn = (props) => {


 return(
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={25} color={colors.textMain}/>
  )
}



export default HeaderBtn