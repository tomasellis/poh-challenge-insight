const allPromisesKeepResults = <A>(promises: Promise<A>[]): Promise<A[]> =>
  Promise.allSettled(promises).then((values) =>
    values
      .map((value) => (value.status === "fulfilled" ? [value.value] : []))
      .flat()
  );

export { allPromisesKeepResults };
