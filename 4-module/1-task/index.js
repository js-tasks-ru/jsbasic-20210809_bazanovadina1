function makeFriendsList(friends) {
  friends = friends.map(item => `<li>${item.firstName} ${item.lastName}</li>`)
  const friendsList = document.createElement('UL')
  for ( let i = 0; i < friends.length; i++) {
    friendsList.insertAdjacentHTML('beforeEnd',friends[i])
  }
  return friendsList
}
