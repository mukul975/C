package CgdnaWeb;

use Mojo::Base 'Mojolicious';

use Authdb;

use Mojo::IOLoop::ReadWriteFork;

# This method will run once at server start
sub startup {
  my $self = shift;

  my $config = $self->plugin('Config');

  $self->secrets([ $config->{secrets} ]) if $config->{secrets};
  ###$self->defaults('myappmode' => $self->mode );
  ### $self->sessions->cookie_domain('localhost');    # TODO configurable       
  $self->sessions->cookie_name($config->{cookiename}) if $config->{cookiename};
  $self->sessions->default_expiration(0);

  $self->log->format( sub {
      my ($time, $level, @lines) = @_;
      my @t = localtime(time);
      return sprintf("[%04d%02d%02d %02d:%02d:%02d] [%s] %s\n",
        $t[5] + 1900, $t[4] + 1, $t[3], $t[2], $t[1], $t[0],
        $level,
        join("\n", @lines),
      );
    }
  );
  $SIG{__WARN__} = sub {
    my $m = shift;
    chomp($m);
    @_ = ($self->log, $m);
    goto &Mojo::Log::warn;
  };


  $self->helper(
    authdb => sub {
      my $c = shift;
      state $authdb;
      return $authdb if $authdb;
      $authdb = Authdb->new(config => $config);
      die "ERROR: authdb helper: could not instantiate\n" unless $authdb;
      return $authdb;
    }
  );

  $self->helper(wauserid => sub { shift->session('wauserid'); });
  $self->helper(wauser   => sub { shift->stash('wauser'); });

  $self->helper( is_loggedin => sub {
      my $c = shift;
      return 1 if $c->config->{bypass_auth}; ### MODIF PHV
      my $wauserid = shift // $c->session('wauserid'); # set in login handler
      return 0 unless $wauserid;

      my $wauser = $c->stash->{wauser};
      if ( $wauser ) {
        $wauserid = $wauser->userid;
        return $wauserid if $wauserid;
      }

      $wauser = $c->authdb->load_user($wauserid);
      unless ( $wauser ) {
        $c->app->log->error("is_loggedin: wauser $wauserid from session not found in database");
        return 0;
      }
      #$c->app->log->debug("is_loggedin: wauser $wauserid loaded from database"
      $c->stash( wauser => $wauser );
      return $wauserid;
    }
  );

  #$self->helper( forker => sub {
  #my $c = shift;
  #my $forker = Mojo::IOLoop::ReadWriteFork->new(config => $config);
  #$forker->on('error' => sub { my ($forker, $error) = @_; warn "FORKER ERROR: $error"; });
  #return $forker;
  #}
  #);

  # Router
  my $r = $self->routes;

  #$r->get('/')->to(controller => 'Root', action => 'index');
  $r->get('/')->to(controller => 'Viewer', action => 'view1');
  $r->get('/index')->to(controller => 'Root', action => 'index');

  $r->post('/login')->to(controller => 'Auth', action => 'login');
  $r->any('/logout')->to(controller => 'Auth', action => 'logout');

  my $if_loggedin = $r->under('/')->to(controller => 'Auth', action => 'if_loggedin');

  $if_loggedin->get('/view1')->to(controller => 'Viewer', action => 'view1');
  $if_loggedin->get('/data/:seq_id')->to(controller => 'DataProvider', action => 'data1');
  $if_loggedin->get('/data2/:seq_id')->to(controller => 'DataProvider', action => 'data2');
  $if_loggedin->post('/data2')->to(controller => 'DataProvider', action => 'data2');
  $if_loggedin->post('/data3')->to(controller => 'DataProvider', action => 'data3'); #Added by LdB

}

1;
