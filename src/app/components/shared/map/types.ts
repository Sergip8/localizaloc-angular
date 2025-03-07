import * as leaflet from 'leaflet';

/**
 * 施設クラス。
 */
export class Facility {

  /** 名称。 */
  public name: string;
  /** 座標 */
  public coordinate: leaflet.LatLng;

  /**
   * コンストラクター。
   * @param name 名称。
   * @param coordinate 座標。
   */
  public constructor(name: string, coordinate: leaflet.LatLng) {
    this.name = name;
    this.coordinate = coordinate;
  }

}