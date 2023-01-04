import { BrandData } from "./brandData";

export const Logo = (ordersArr) => {
  ordersArr.map(player => player.logo = findLogo(player))
};

const findLogo = (player) => {
    let found = BrandData.findIndex((item) => item.siteID === player.siteID);
    return BrandData[found].img
}
