import ENV from 'fh-matchmaking/config/environment';

const { api: { host, namespace } } = ENV;

export default function() {
  this.urlPrefix = `${host}/${namespace}`;

  this.post('/admins');
  this.post('/hosts');
  this.post('/caseworkers');

  this.get('/admins');
  this.get('/hosts');
  this.get('/caseworkers');

  this.get('/admins/:id');
  this.get('/hosts/:id');
  this.get('/caseworkers/:id');

  this.patch('/admins/:id');
  this.patch('/hosts/:id');
  this.patch('/caseworkers/:id');

  this.post('/host-profiles');
  this.post('/resident-profiles');

  this.patch('/host-profiles/:id');
  this.patch('/resident-profiles/:id');

  this.del('/host-profiles/:id');
  this.del('/resident-profiles/:id');

  this.get('/userStats', ({ hosts, residentProfiles }) => {
    return {
      hosts: hosts.length,
      residents: residentProfiles.length
    };
  });
}
