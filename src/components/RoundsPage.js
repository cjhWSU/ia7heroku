import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundsMode  from './RoundsMode.js';
import RoundsTable from './RoundsTable.js';
import RoundForm from './RoundForm.js';
import FloatingButton from './FloatingButton.js'
import NotificationToast from './NotificationToast.js';
import PopUpModal from './PopUpModal.js';

class RoundsPage extends React.Component {
    constructor(props) {
            super(props);
            this.state = {mode: RoundsMode.ROUNDSTABLE,
                          deleteId: -1,
                          editId: -1,
                          renderToast: false,
                          confirmDialog: false};
    }

    setMode = (newMode) => {
        this.setState({mode: newMode});
    }

    setMode = (newMode) => {
        this.setState({mode: newMode});
    }

    initiateEditRound = (val) => {
        this.setState({editId: val,
                       mode: RoundsMode.EDITROUND}, 
                       this.props.toggleModalOpen);
    }
    
    initiateDeleteRound = (val) => {
        this.setState({deleteId: val,
                       confirmDialog: true})
    }

    removeToast = () => {
        this.setState({renderToast: false})
    }

    cancelDelete = () => {
        this.setState({confirmDialog: false})
    }

    confirmDelete = (val) => {
        this.props.deleteRound(val)
        this.setState({renderToast: true})
    }

    render() {
        switch (this.state.mode) {
        case RoundsMode.ROUNDSTABLE: 
            return (
                <>
                    <div className="space">
                    {this.state.confirmDialog ? <PopUpModal cancelDelete = {this.cancelDelete} 
                                                            confirmDelete = {this.confirmDelete}
                                                            text = {'Deleting round: ' + this.state.deleteId.toString()}
                                                            deleteId = {this.state.deleteId}/> 
                                              : null}
                    {this.state.renderToast ? <NotificationToast removeToast = {this.removeToast}
                                                                 message = {"Round " + this.state.deleteId.toString() + " deleted!"}/> 
                                            : null}
                    </div>
                    <RoundsTable rounds={this.props.rounds}
                                initiateDeleteRound={this.initiateDeleteRound}
                                deleteRound={this.props.deleteRound} 
                                deleteId={this.state.deleteId}
                                initiateEditRound= {this.initiateEditRound}
                                updateRound= {this.props.updateRound}
                                setMode={this.setMode} 
                                toggleModalOpen={this.props.toggleModalOpen}
                                menuOpen={this.props.menuOpen} /> 
                    <FloatingButton
                        icon="calendar"
                        label={"Log Round"}
                        menuOpen={this.props.menuOpen}
                        action={()=>this.setState({mode: RoundsMode.LOGROUND},
                                    this.props.toggleModalOpen)} />
            </>
            );
        case RoundsMode.LOGROUND:
            return (
            <RoundForm mode={this.state.mode}
                    roundData={null}
                    saveRound={this.props.addRound}
                    setMode={this.setMode}
                    toggleModalOpen={this.props.toggleModalOpen} />
            );
        case RoundsMode.EDITROUND:
            let i;
            for (i = 0; i < this.props.rounds.length; ++i) {
                if (this.props.rounds[i].roundNum === this.state.editId) {
                    break;
                }
            }
            return (
            <RoundForm mode={this.state.mode}
                editId = {this.state.editId}
                roundData={this.props.rounds[i]}
                saveRound={this.props.updateRound}
                setMode={this.setMode}
                toggleModalOpen={this.props.toggleModalOpen} />
            );
        }
    }  

}

export default RoundsPage;