import React from "react";
import '../pages/VisualiserCart.css';

const Visualiser = () => {
    return (
        <div>
            <div className="container">
                <div className="credit-card mx-auto" style={{ marginBottom: '50px' }}> {/* Ajout de marginTop ici */}
                    <div className="credit-card-front">
                        <div className="d-flex justify-content-between">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGYklEQVR4nO1cW1MURxTeh1x+UB5SqTykypklVCURH0IMVokkUBpTFUAqKjPLpcTdiL4EdWcXBCVGBDVVBiKQRJDrrilu+6JWosXN8oJgHjBmEt869fVuL2iIuzPbPbMb+lT12/Tp09+c7vP1mT7j8UiRIkWKFClSpEiRIkVK1kvL7jdeDWtbvCFNNQxdvW7o6t2QrjwL6SrJraY8o7ZratTQlWDIp6iYmzDgjn+R/7rhU6oMTX3s/uRVIS0xt0rMlSt4Yc37tqErC2ygrsYCEjlXRuav7ifLkVryx9RhYsYCOdVgM2zHHDCXzqMFa2BqynxztfIWF/CCPrXI0NS/ofh8YwG59UOl65M3BbXZn74kF45tSy7xoO4tyQg8Q1eK2VsZbC0mT2f8rk/SFNz+nPGTsbOfrl/aZbaXLQsO05f2uj4x0+E2dXFv0hMtL2caMBJ73siZEtcnY7rUhs+UMC+cu1Rf+FraACLa0mBxbBt1abcnYrrUsGUhYCYidEVa4AFpRlXu9FfZGng5UvsvitBa9y7pbCwgI+0l5MGwzn2y90d0qhtjYKwXx4dNdvTe6atiS3klLZ5ISXKCqtidzPIGAK5vYZ+XDJ3eRZ5O+7nQkWttxSTseznHswsgGqM4QU1VUi9fsHJdJdGOMq4esjrZQBYHD9J9paU2jxp0+esPMwIR4F1uKqS6oBO6MQbG4mk7eGLiRZxIDaCm/IKHQTB5GmGuX25DGjnrf58aBU+0qweeBx3QdX9YE2bv3M/7EwRbjabhgTjbZubyZpogwmuwnB+M6Lb2PCzblpo8oeChPRqPb0lgJikBZNzPiePZ0Old1LDR9k8s90XAoDSrXTzNAhaME6YBYHzTFW2UGQvQ/QpjYZO22hfHSvS9O3jQEVsZLlkF4JOJQ3SsU3X5lvsyqsI7YOQUgKuTDUmOaBdAvIRNC+DiwIGMlzC2gU0L4BCHIALutykBvDekkeYaL6UxD23QGBwH0RdUCJRoUwF471o1+ebwexl7EPNgSqQFg+g6gE8mDpGFgQN00vA8jPF9U2FGRzn0xXGQHeWgG/uqiMBiGUCRLezzUs/jkUyADgAHnU7Y7hqArUhnHS2gAcPO0S1Vg07oxhgbpbMcB5CXy5sC9yUn7ZAAxi ```javascript
SARHpgTC5huQemEhlEAjKImDIKBySNCUkemB0E1swSOySRjkkASU55IK/WffwjMvPd52QlWufYsl2J1NIreRj7f5ONCftU0h8qIsvj4j7YP47W0YugzQJTW44R6dXJBrI06iM3eipIf2hHMomKT5i/9e7jDt6vVyqTaSyM9WNoB7nZU05t4PHp03EAzRfao/Ea0hv8OOmNPG+94jYpu52Fl4WrGLztdx1AM9Emu/bQyaLx8ER4Xlyfl0xd+EyY3VkDoBkLkImu3cnljH0rk2DBlu3kRXHgZR2AZixAeo0iOs5gW7FtHVdP7UwuW9H2Zh2AS2M1ye/C8CQ73oe+0IH9ddMBaMYClNZgLPBEq30RhNAX0dYJW7MSwJvd5XSsnpPbLfftObGd9gVVyTIAnbtguTTqo0Z1HNlquW/HVx/QvtgKsuuCpaYu4mGRJwaT4/U2J+4HYo+lAGrKfEoAUQMs+pK5mWMAWrtkrikn8TCu9mfzEj5/ZCvt+3DUJ9zO8XOlbAk3pV1oY+fSo2mx3eARRLrFBxF2mTOtQhuUMyVLvfrslXqZaTYQYLs0Bn2cING3+/bRcQxNWU77lwAoe2flXqJqhJcokc6jqSc7xznkF0UTacx9rZJdKfdYKXdFxBF2hXbGn8zMDLbZr1QaaI1XKkGXCADZBU5DU2ctlbtCUGTMOCHSRTwNm+iMJxNa6/PJ79frbeuB5yIhQZMJXXu42jiVOOngdwfBau+bHjsSqlZ3PlfyP50huZ7xU/BYOus2hz0WKTGmD1ke3iX/hral1JPpTydCuvoXlIE62P3pxNJYDbmyLqFqJ3C87FzMEqrI8tg9neCnEygy5/bTieeXszrH3go21si3pZRg4sSy0bEPBBccDTQjntKPl7iCAPPwvI08kS1njIVEBcb+r5Q+bEbmGnMAz0Oh9prXqbO2l22KSvYKVG6L+mATcrmBqiDaWg4YVgRcCIQSxcchTY3Gz865+usnZcHQlQjmgjnV17/zijDgpEiRIkWKFClSpEiRIsXDS/4BFi8jd/R4b2kAAAAASUVORK5CYII=" alt="Chip" width="50" />
                            <div className="hologram"></div>
                        </div>
                        <div className="card-number">
                            4539 1488 0343 6467
                        </div>
                        <div className="d-flex justify-content-between align-items-end">
                            <div>
                                <div className="card-holder mb-1">John Doe</div>
                                <div className="card-expires">Valid Thru: 12/25</div>
                            </div>
                            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" width="60" />
                        </div>
                    </div>
                    <div className="credit-card-back">
                        <div className="magnetic-strip"></div>
                        <div className="cvv">
                            <span className="me-2">CVV</span>123
                        </div>
                        <div className="card-details p-3">
                            This card is property of Our Bank. Misuse is criminal offence. If found, please return to Our Bank or to
                            the nearest bank.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Visualiser;