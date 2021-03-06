import SPELLS from 'common/SPELLS';

import Module from 'Parser/Core/Module';

class PowerWordShieldWasted extends Module {
  wasted = 0;
  count = 0;
  totalCount = 0;

  on_byPlayer_removebuff(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.POWER_WORD_SHIELD.id) {
      return;
    }
    if (event.absorb > 0) {
      this.wasted += event.absorb;
      this.count += 1;
    }
    this.totalCount += 1;
  }
}

export default PowerWordShieldWasted;
