import { Application, IManifest, ManifestReader } from '@spinnaker/core';

export interface IManifestContainer {
  manifest: IManifest;
}

export interface IManifestParams {
  account: string;
  location: string;
  name: string;
}

type Callback = (manifest: IManifest) => void;

export class KubernetesManifestService {
  public static makeManifestRefresher(
    app: Application,
    params: IManifestParams,
    container: IManifestContainer,
  ): () => void {
    const onUpdate = (manifest: IManifest) => {
      container.manifest = manifest || container.manifest;
    };
    return KubernetesManifestService.subscribe(app, params, onUpdate);
  }

  public static subscribe(app: Application, params: IManifestParams, fn: Callback): () => void {
    KubernetesManifestService.updateManifest(params, fn);
    return app.onRefresh(null, () => KubernetesManifestService.updateManifest(params, fn));
  }

  private static updateManifest(params: IManifestParams, fn: Callback) {
    ManifestReader.getManifest(params.account, params.location, params.name).then(manifest => fn(manifest));
  }
}
