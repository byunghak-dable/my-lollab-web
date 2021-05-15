export const getProfileIconUrl = (iconId = 29) => {
  return `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/${iconId}.png`;
};

export const getChampionIconUrl = (championName: string) => {
  return `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${championName}.png`;
};
