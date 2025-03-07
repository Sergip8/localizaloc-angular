import 'leaflet.markercluster';

import * as leaflet from 'leaflet';
import { defer, Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { Facility } from '../map/types';

/**
 * 地図サービス。
 */
@Injectable({
  providedIn: 'root'
})
export class MapService {

  public constructor() { }

  /**
   * マーカーを生成する。
   *
   * @param facility 施設情報。
   * @param markerLayer マーカーレイヤー。
   * @param materialIconName Material Icon を指定する。 <https://fonts.google.com/icons?selected=Material+Icons>
   * @returns マーカー。
   */
  public createMaker(facility: Facility, markerLayer: leaflet.MarkerClusterGroup, materialIconName: string = ''): leaflet.Marker {
    const marker: leaflet.Marker = new leaflet.Marker(
      facility.coordinate,
      {
        icon: new leaflet.Icon(
          {
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png',
            iconAnchor: new leaflet.Point(13, 41)
          }
        )
      }
    );

    // マーカークリック時に表示するポップアップを設定する。
    let contentHTML: string = '';
    contentHTML += '<div style="display: flex;">';
    contentHTML += '    <div>';
    contentHTML += (materialIconName == '') ? '        <img src="assets/marker-icon.png" />' : '        <span class="material-icons">' + materialIconName + '</span>';
    contentHTML += '    </div>';
    contentHTML += '    <div>';
    contentHTML += '        <span>' + facility.name + '</span>';
    contentHTML += '        <table>';
    contentHTML += '            <tbody>';
    contentHTML += '                <tr>';
    contentHTML += '                    <td>緯度</td>';
    contentHTML += '                    <td>' + facility.coordinate.lat.toString() + '</td>';
    contentHTML += '                </tr>';
    contentHTML += '                <tr>';
    contentHTML += '                    <td>緯度</td>';
    contentHTML += '                    <td>' + facility.coordinate.lng.toString() + '</td>';
    contentHTML += '                </tr>';
    contentHTML += '            </tbody>';
    contentHTML += '        </table>';
    contentHTML += '    </div>';
    contentHTML += '</div>';

    const popup: leaflet.Popup = new leaflet.Popup(
      {
        closeButton: true,
      }
    )
      .setLatLng(facility.coordinate)
      .setContent(contentHTML);

    marker.bindPopup(popup);

    return marker;
  }

  /**
   * マップにクリックイベントを追加する。
   *
   * @param map クリックイベント追加対象のマップ。
   * @param markerLayer マーカーを追加するレイヤー。
   */
  public addClickEventForMap(map: leaflet.Map, markerLayer: leaflet.MarkerClusterGroup): void {
    if ((map == null) || (markerLayer == null)) {
      return;
    }

    // マップクリック時に新しいマーカーを追加する。
    map.on('click', (e: leaflet.LeafletMouseEvent) => {
      const facility: Facility = new Facility('', new leaflet.LatLng(e.latlng.lat, e.latlng.lng));

      markerLayer.addLayer(this.createMaker(facility, markerLayer));
    });
  }

  /**
   * 駅情報を取得する。
   *
   * @returns 駅情報の一覧。
   */
  public getStations(): Observable<Array<Facility>> {
    return defer(() => {
      const stations: Array<Facility> = new Array<Facility>(
        new Facility('博多駅', new leaflet.LatLng(33.59, 130.420611)),
        new Facility('大分駅', new leaflet.LatLng(33.233375, 131.606453)),
        new Facility('宮崎駅', new leaflet.LatLng(31.915675, 131.432017)),
        new Facility('佐賀駅', new leaflet.LatLng(33.264239, 130.297164)),
        new Facility('長崎駅', new leaflet.LatLng(32.752336, 129.871964)),
        new Facility('熊本駅', new leaflet.LatLng(32.789333, 130.688694)),
        new Facility('鹿児島駅', new leaflet.LatLng(31.601497, 130.563114)),
      );

      return of(stations);
    });
  }

}