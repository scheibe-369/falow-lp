// Curvas do Falow Path da seção "Como funciona", em frações de W/H.
// Serpenteia entre os cards alternados (esq/dir), entra pelo topo e
// sai pela base. Terminais fora da tela pra leitura de fluxo contínuo.
export function cfPathDesktop(W, H) {
  const x = (f) => (f * W).toFixed(1);
  const y = (f) => (f * H).toFixed(1);
  return (
    'M ' + x(0.45) + ' ' + y(-0.04) +
    ' C ' + x(0.62) + ' ' + y(0.08) + ', ' + x(0.72) + ' ' + y(0.16) + ', ' + x(0.55) + ' ' + y(0.26) +
    ' C ' + x(0.38) + ' ' + y(0.36) + ', ' + x(0.22) + ' ' + y(0.4) + ', ' + x(0.34) + ' ' + y(0.52) +
    ' C ' + x(0.46) + ' ' + y(0.64) + ', ' + x(0.72) + ' ' + y(0.62) + ', ' + x(0.62) + ' ' + y(0.76) +
    ' C ' + x(0.52) + ' ' + y(0.9) + ', ' + x(0.4) + ' ' + y(0.94) + ', ' + x(0.47) + ' ' + y(1.05)
  );
}

export const CF_TRIGGERS = [0.14, 0.42, 0.68, 0.93];
