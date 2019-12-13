const BACK_LEAVE = (ctx) => {
  if(ctx.message.text === 'Back') {
    ctx.reply('Enter License')
    return ctx.wizard.back();
  } else if(ctx.message.text === 'Leave') {
    console.log('leave')
    ctx.reply('Bye, friend :)')
    return ctx.scene.leave();
  } else {
    ctx.reply('Enter valid License')
    ctx.wizard.back();
  }
}

module.exports = {
  BACK_LEAVE
}