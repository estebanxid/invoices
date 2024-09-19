// export const MapperObject = <T, U>(
//   source: T,
//   mapping: Record<keyof T, keyof U>,
//   transformValue: (key: keyof T, value: any) => any,
// ): U => {
//   const result: Partial<U> = {};

//   for (const [sourceKey, targetKey] of Object.entries(mapping) as [
//     keyof T,
//     keyof U,
//   ][]) {
//     if (source.hasOwnProperty(sourceKey)) {
//       result[targetKey] = transformValue(sourceKey, source[sourceKey]);
//     }
//   }

//   return result as U;
// };

export const MapperObject = <T, U>(
  source: T,
  mapping: Record<keyof T, keyof U>,
  transformValue: (key: keyof T, value: any) => any = (key, value) => value,
): U => {
  const result: Partial<U> = {}; // Utiliza Partial para manejar propiedades opcionales

  for (const [sourceKey, targetKey] of Object.entries(mapping) as [
    keyof T,
    keyof U,
  ][]) {
    if (source.hasOwnProperty(sourceKey)) {
      result[targetKey] = transformValue(sourceKey, source[sourceKey]);
    }
  }

  return result as U;
};
