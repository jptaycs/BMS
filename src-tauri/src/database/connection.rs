use rusqlite::{Connection, Result};

pub fn connect() -> Result<Connection>{
    Connection::open("bms.db")
}
