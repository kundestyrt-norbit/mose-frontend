export interface SensorMetaData{
  friendlyName: string
  unit: string
  description: string | null
}

export const SensorMetaDataMap: {[key: string]: SensorMetaData} = {
  temperature: {
    friendlyName: 'Temperature',
    unit: '°C',
    description: null
  },
  humidity: {
    friendlyName: 'Relative humidity',
    unit: '%',
    description: null
  },
  mc_2_5: {
    friendlyName: 'PM 2.5',
    unit: 'μg/m&sup3',
    description: 'Mass concentration of particles with size 0.3 to 2.5 μm.'
  },
  mc_10_0: {
    friendlyName: 'PM 10',
    unit: 'μg/m&sup3',
    description: 'Mass concentration of particles with size 0.3 to 10 μm'
  },
  mc_4_0: {
    friendlyName: 'PM 4',
    unit: 'μg/m&sup3',
    description: 'Mass concentration of particles with size 0.3 to 4 μm'
  },
  nc_10_0: {
    friendlyName: 'PM 10',
    unit: '#/m&sup3',
    description: 'Number concentration of particles with size 0.3 to 10 μm.'
  },
  mc_1_0: {
    friendlyName: 'PM 1',
    unit: 'μg/m&sup3',
    description: 'Mass concentration of particles with size 0.3 to 1μm.'
  },
  nc_0_5: {
    friendlyName: 'PM 0.5',
    unit: '#/m&sup3',
    description: 'Number concentration of particles with size 0.3 to 0.5 μm.'
  },
  nc_2_5: {
    friendlyName: 'PM 2.5',
    unit: '#/m&sup3',
    description: 'Number concentration of particles with size 0.3 to 2.5 μm.'
  },
  nc_1_0: {
    friendlyName: 'PM 1',
    unit: '#/m&sup3',
    description: 'Number concentration of particles with size 0.3 to 1 μm.'
  },
  nc_4_0: {
    friendlyName: 'PM 4',
    unit: '#/m&sup3',
    description: 'Number concentration of particles with size 0.3 to 4 μm.'
  },
  typical_particle_size: {
    friendlyName: 'Typical particle size',
    unit: 'μm',
    description: null
  }
}
