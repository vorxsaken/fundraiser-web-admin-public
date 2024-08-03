import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import React from 'react'
import { person, people, personCircleOutline } from 'ionicons/icons'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import Siswa from './Siswa'
import Admin from './Admin'
import Profile from './Profile'
import FormSiswa from './FormSiswa'
import DetailSiswa from './DetailSiswa'
import FormAdmin from './FormAdmin'
import DetailAdmin from './DetailAdmin'
import FormTagihan from './FormTagihan'
import DetailTagihan from './DetailTagihan'

const Tabs: React.FC<RouteComponentProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path='/tabs' to='/tabs/siswa' />
        <Route exact path='/tabs/siswa' render={props => <Siswa {...props} />} />
        <Route exact path='/tabs/admin'>
          <Admin />
        </Route>
        <Route exact path='/tabs/profile'>
          <Profile />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/siswa" />
        </Route>

        <Route path={`/tabs/:view/detail-siswa/:id`} component={DetailSiswa} />
        <Route path={`/tabs/:view/edit-siswa/:id/:isEdit`} component={FormSiswa} />

        <Route path={`/tabs/:view/detail-admin/:id`} component={DetailAdmin} />
        <Route path={`/tabs/:view/edit-admin/:id/:isEdit`} component={FormAdmin} />

        <Route path={`/tabs/:view/detail-tagihan/:id`} component={DetailTagihan} />
        <Route path={`/tabs/:view/edit-tagihan/:id/:isEdit`} component={FormTagihan} />

        <Route path={`/tabs/:tab/add-siswa/:isEdit`} component={FormSiswa} />
        <Route path={`/tabs/:tab/add-admin/:isEdit`} component={FormAdmin} />

        <Route path={`/tabs/:view/edit-profile/:id/:isEdit/:isEditProfile`} component={FormAdmin} />

        <Route path={`/tabs/:view/form-tagihan/:id/:isEdit`} component={FormTagihan} />
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab='home' href='/tabs/siswa'>
          <IonIcon icon={people} />
          <IonLabel>Siswa</IonLabel>
        </IonTabButton>
        <IonTabButton tab='riwayat' href='/tabs/admin'>
          <IonIcon icon={person} />
          <IonLabel>Admin</IonLabel>
        </IonTabButton>
        <IonTabButton tab='pembayaran' href='/tabs/profile'>
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs