import SPELLS from 'common/SPELLS';

import Module from 'Parser/Core/Module';
import calculateEffectiveHealing from 'Parser/Core/calculateEffectiveHealing';


const T19_2SET_HEALING_INCREASE = 0.15;
const TIDAL_WAVES_BUFF_EXPIRATION_BUFFER = 50; // the buff expiration can occur several MS before the heal event is logged, this is the buffer time that an IoL charge may have dropped during which it will still be considered active.

class Restoration_Shaman_T19_2Set extends Module {
  healing = 0;

  on_initialized() {
    if (!this.owner.error) {
      this.active = this.owner.selectedCombatant.hasBuff(SPELLS.RESTORATION_SHAMAN_T19_2SET_BONUS_BUFF.id);
    }
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;
    if (!(spellId === SPELLS.HEALING_WAVE.id) && !(spellId === SPELLS.HEALING_SURGE.id)) {
        return;
    }
    

    if (!this.owner.selectedCombatant.hasBuff(SPELLS.TIDAL_WAVES_BUFF.id, event.timestamp, TIDAL_WAVES_BUFF_EXPIRATION_BUFFER)) {
      return;
    }

    this.healing += calculateEffectiveHealing(event, T19_2SET_HEALING_INCREASE);
  }

}

export default Restoration_Shaman_T19_2Set;
