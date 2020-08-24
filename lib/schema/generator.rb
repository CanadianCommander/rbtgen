module Schema
  module Generator

    MYSQL_PORT = 3306.freeze
    SSH_PORT = 22.freeze

    # ----------------------------------------------------------
    # Module Methods
    # ----------------------------------------------------------

    # get a connection to a database
    # @param [String] host - host name of database server
    # @param [String] database - the database to connect too]
    # @param [String] user - the database user
    # @param [String] password - the database password
    # @param [Integer] port - port the DB is running on
    # @return [::Mysql2::Client] the connected client
    def self.connect_to_database(host, database, user, password, port=MYSQL_PORT)
      return Mysql2::Client.new({host: host, username: user, password: password, port: port, database: database})
    end

    # execute a block with an ssh tunnel
    # @param [String] host - host name of ssh server
    # @param [String] user - the ssh user
    # @param [Integer] remote_port - the remote port to tunnel to on the target server
    # @param [Integer] ssh_port - the ssh port
    # @yield the block is provided with the local port the the tunnel is running on
    def self.with_ssh_tunnel(host, user, remote_port, ssh_port=SSH_PORT)
      ssh_gateway = Net::SSH::Gateway.new(host, user, port: ssh_port)
      port = ssh_gateway.open('127.0.0.1', remote_port)

      begin
        yield(port)
      ensure
        ssh_gateway.shutdown!
      end
    end
  end
end